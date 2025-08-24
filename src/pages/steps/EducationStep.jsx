import React from "react";
import { useNavigate } from "react-router-dom";
import { StepWrapper, TextInput, DollarInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";
import { z } from "zod";

const schema = z.object({
  institution: z.string().min(1, "Institution name is required"),
  tuition: z.number().nonnegative("Tuition must be zero or more"),
  materials: z.number().nonnegative("Materials must be zero or more"),
});

const EducationStep = () => {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenarioStore();

  const [institution, setInstitution] = React.useState("");
  const [tuition, setTuition] = React.useState(0);
  const [materials, setMaterials] = React.useState(0);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    const existing = scenario?.deductions?.education?.[0];
    if (existing) {
      setInstitution(existing.institution || "");
      setTuition(existing.tuition || 0);
      setMaterials(existing.materials || 0);
    }
  }, [scenario]);

  const onSubmit = () => {
    const parsed = schema.safeParse({ institution, tuition, materials });

    if (!parsed.success) {
      const formatted = parsed.error.format();
      setErrors({
        institution: formatted.institution?._errors?.[0],
        tuition: formatted.tuition?._errors?.[0],
        materials: formatted.materials?._errors?.[0],
      });
      return;
    }

    const updatedScenario = {
      ...scenario,
      deductions: {
        ...scenario.deductions,
        education: [
          {
            institution,
            tuition,
            materials,
          },
        ],
      },
    };

    setScenario(updatedScenario);
    navigate("/steps/retirement"); // Next step
  };

  return (
    <StepWrapper title="Education Expenses">
      <TextInput
        label="Institution Name"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        error={errors.institution}
      />
      <DollarInput
        label="Tuition Paid"
        value={tuition}
        onChange={(val) => setTuition(val)}
        error={errors.tuition}
      />
      <DollarInput
        label="Books & Materials"
        value={materials}
        onChange={(val) => setMaterials(val)}
        error={errors.materials}
      />

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition font-medium"
          onClick={() => navigate("/steps/investments")}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-brand-600 text-white hover:opacity-90 transition font-medium"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </StepWrapper>
  );
};

export default EducationStep;