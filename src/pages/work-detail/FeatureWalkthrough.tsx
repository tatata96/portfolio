import {useState} from "react";
import type {CaseStudy} from "./caseStudies";

type FeatureWalkthroughProps = {
  walkthrough: NonNullable<CaseStudy["walkthrough"]>;
};

function FeatureWalkthrough({walkthrough}: FeatureWalkthroughProps) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = walkthrough.steps[activeStep] ?? walkthrough.steps[0];

  return (
    <div className="solution-walkthrough">
      <p className="solution-walkthrough__intro">{walkthrough.intro}</p>

      {walkthrough.steps.length > 0 ? (
        <>
          <div
            className="solution-walkthrough__steps"
            aria-label={walkthrough.ariaLabel}
          >
            {walkthrough.steps.map((step, stepIndex) => (
              <button
                className={
                  stepIndex === activeStep
                    ? "solution-step solution-step--active"
                    : "solution-step"
                }
                key={step.number}
                type="button"
                onClick={() => setActiveStep(stepIndex)}
              >
                <span>{step.number}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p>{step.screenBody}</p>
                </div>
              </button>
            ))}
          </div>

          {currentStep ? (
            <div className="solution-phone" aria-live="polite">
              <div className="solution-phone__device">
                <div className="solution-phone__screen">
                  <div className="solution-phone__island" />
                  <img
                    src={currentStep.image}
                    alt={`${currentStep.screenTitle} screen`}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div
            className="solution-walkthrough__print-screens"
            aria-label={`${walkthrough.ariaLabel} screens`}
          >
            {walkthrough.steps.map((step) => (
              <figure key={step.image}>
                <img src={step.image} alt={`${step.screenTitle} screen`} />
                <figcaption>
                  {step.number}. {step.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FeatureWalkthrough;
