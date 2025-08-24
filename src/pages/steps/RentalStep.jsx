import React from "react";
import { useForm } from "react-hook-form";
import { useScenarioStore } from "../../store/scenarioStore";
import WizardNav from "../../components/WizardNav";
import { clean, toNum } from "../../lib/utils/formatters";

export default function RentalStep() {
  const { scenario, setScenario } = useScenarioStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      propertyName: "",
      location: "",
      daysRented: 0,
      personalUseDays: 0,
      grossRent: 0,
      mortgageInterest: 0,
      propertyTax: 0,
      insurance: 0,
      repairs: 0,
      hoa: 0,
      managementFees: 0,
      utilities: 0,
      other: 0,
    },
  });

  React.useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = (v) => {
    const entry = {
      propertyName: clean(v.propertyName),
      location: clean(v.location),
      daysRented: toNum(v.daysRented),
      personalUseDays: toNum(v.personalUseDays),
      grossRent: toNum(v.grossRent),
      expenses: {
        mortgageInterest: toNum(v.mortgageInterest),
        propertyTax: toNum(v.propertyTax),
        insurance: toNum(v.insurance),
        repairs: toNum(v.repairs),
        hoa: toNum(v.hoa),
        managementFees: toNum(v.managementFees),
        utilities: toNum(v.utilities),
        other: toNum(v.other),
      },
      activeParticipation: true,
    };

    const rentals = Array.isArray(scenario.income.rentals)
      ? [...scenario.income.rentals, entry]
      : [entry];

    setScenario({ income: { ...scenario.income, rentals } });
    reset();
    return true; // let WizardNav advance
  };

  return (
    <div className="rounded-2xl bg-white shadow-soft p-4">
      <h1 className="text-xl font-semibold text-slate-800 mb-4">Rental Income</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm mb-1">Property Name</label>
          <input
            {...register("propertyName", { required: "Property name is required" })}
            className="w-full rounded-xl border px-3 py-2"
          />
          {errors.propertyName && (
            <p className="text-sm text-red-600 mt-1">{errors.propertyName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full rounded-xl border px-3 py-2"
          />
          {errors.location && (
            <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Days Rented</label>
          <input type="number" {...register("daysRented")} className="w-full rounded-xl border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Personal Use Days</label>
          <input type="number" {...register("personalUseDays")} className="w-full rounded-xl border px-3 py-2" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm mb-1">Gross Rent</label>
          <input type="number" step="0.01" {...register("grossRent")} className="w-full rounded-xl border px-3 py-2" />
        </div>

        <div className="sm:col-span-2 mt-2 font-medium text-slate-700">Expenses</div>
        {[
          "mortgageInterest",
          "propertyTax",
          "insurance",
          "repairs",
          "hoa",
          "managementFees",
          "utilities",
          "other",
        ].map((key) => (
          <div key={key}>
            <label className="block text-sm mb-1">{key}</label>
            <input type="number" step="0.01" {...register(key)} className="w-full rounded-xl border px-3 py-2" />
          </div>
        ))}

        <div className="sm:col-span-2">
          <button className="inline-flex items-center rounded-xl px-4 py-2 bg-brand-600 text-white" type="submit">
            Add Rental
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Current Rentals</h2>
        <ul className="mt-2 text-sm text-slate-700 list-disc pl-5">
          {scenario.income.rentals?.map((r, i) => (
            <li key={i}>
              {r.propertyName} — {r.location} — Rent: ${r.grossRent?.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <WizardNav onNext={handleSubmit(onSubmit)} />
    </div>
  );
}