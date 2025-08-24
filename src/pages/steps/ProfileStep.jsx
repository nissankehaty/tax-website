import React from "react";
import { useForm } from "react-hook-form";
import { useScenarioStore } from "../../store/scenarioStore";
import WizardNav from "../../components/WizardNav";
import { clean, toInt } from "../../lib/utils/formatters";

export default function ProfileStep() {
  const { scenario, setScenario } = useScenarioStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scenarioName: scenario.metadata?.scenarioName || "My 2025 Draft",
      filingStatus: scenario.metadata?.filingStatus || "married_filing_jointly",
      dependents: scenario.metadata?.dependents ?? 0,
      primaryFirst: scenario.taxpayers?.primary?.firstName || "",
      primaryLast: scenario.taxpayers?.primary?.lastName || "",
      spouseFirst: scenario.taxpayers?.spouse?.firstName || "",
      spouseLast: scenario.taxpayers?.spouse?.lastName || "",
    },
  });

  React.useEffect(() => {
    reset({
      scenarioName: scenario.metadata?.scenarioName || "My 2025 Draft",
      filingStatus: scenario.metadata?.filingStatus || "married_filing_jointly",
      dependents: scenario.metadata?.dependents ?? 0,
      primaryFirst: scenario.taxpayers?.primary?.firstName || "",
      primaryLast: scenario.taxpayers?.primary?.lastName || "",
      spouseFirst: scenario.taxpayers?.spouse?.firstName || "",
      spouseLast: scenario.taxpayers?.spouse?.lastName || "",
    });
  }, [scenario, reset]);

  const onSubmit = (values) => {
    setScenario({
      metadata: {
        scenarioName: clean(values.scenarioName),
        filingStatus: clean(values.filingStatus),
        dependents: toInt(values.dependents),
      },
      taxpayers: {
        primary: {
          firstName: clean(values.primaryFirst),
          lastName: clean(values.primaryLast),
        },
        spouse:
          clean(values.spouseFirst) || clean(values.spouseLast)
            ? { firstName: clean(values.spouseFirst), lastName: clean(values.spouseLast) }
            : undefined,
      },
    });

    return true;
  };

  return (
    <div className="rounded-2xl bg-white shadow-soft p-4">
      <h1 className="text-xl font-semibold text-slate-800 mb-4">Personal Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-600 mb-1">Scenario Name</label>
          <input
            {...register("scenarioName", { required: "Scenario name is required" })}
            className="w-full rounded-xl border px-3 py-2"
          />
          {errors.scenarioName && (
            <p className="text-sm text-red-600 mt-1">{errors.scenarioName.message}</p>
          )}
        </div>
        {/* Filing Status + Dependents */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">Filing Status</label>
          <select
            {...register("filingStatus", { required: "Filing status is required" })}
            className="w-full rounded-xl border px-3 py-2"
          >
            <option value="single">Single</option>
            <option value="married_filing_jointly">Married Filing Jointly</option>
            <option value="married_filing_separately">Married Filing Separately</option>
            <option value="head_of_household">Head of Household</option>
            <option value="qualifying_widow">Qualifying Widow(er)</option>
          </select>
          {errors.filingStatus && (
            <p className="text-sm text-red-600 mt-1">{errors.filingStatus.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Dependents</label>
          <input
            type="number"
            min={0}
            {...register("dependents", {
              required: "Number of dependents is required",
              valueAsNumber: true,
              min: { value: 0, message: "Cannot be negative" },
              validate: (v) =>
                Number.isInteger(Number(v)) || "Must be a whole number",
            })}
            className="w-full rounded-xl border px-3 py-2"
          />
          {errors.dependents && (
            <p className="text-sm text-red-600 mt-1">{errors.dependents.message}</p>
          )}
        </div>
        {/* Names */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">Primary First Name</label>
          <input {...register("primaryFirst")} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Primary Last Name</label>
          <input {...register("primaryLast")} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Spouse First Name</label>
          <input {...register("spouseFirst")} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Spouse Last Name</label>
          <input {...register("spouseLast")} className="w-full rounded-xl border px-3 py-2" />
        </div>

        <div className="sm:col-span-2">
          <button className="inline-flex items-center rounded-xl px-4 py-2 bg-brand-600 text-white" type="submit">
            Save Profile
          </button>
        </div>
      </form>

      <WizardNav onNext={handleSubmit(onSubmit)} />
    </div>
  );
}