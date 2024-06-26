import React, { useState } from "react";

import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import Radio from "@components/Layout/Interactions/Forms/RadioGroup/Radio";

type Option = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  defaultValue: string;
  options: Option[];
  name: string;
  onChange?: (value?: string) => void;
  variant?: "accent" | "primary" | "secondary";

  direction?: "row" | "column";

  size?: "sm" | "md" | "lg";
  label: string;
  className?: string;
};

export default function MyRadioGroup(props: RadioGroupProps) {
  const [currentValue, setCurrentValue] = useState<string>(
    props.options[0].value
  );

  const onChange = (value: string) => {
    setCurrentValue(value);
    console.log(value);
    props.onChange && props.onChange(value);
  };

  return (
    <RadioGroup
      value={currentValue}
      onChange={onChange}
      name={props.name}
      className={clsx("flex flex-col gap-2", props.className)}
    >
      <RadioGroup.Label className={"font-semibold"}>
        {props.label}
      </RadioGroup.Label>

      <div
        className={clsx(
          "flex gap-4",
          props.direction === "column" && "flex-col",
          "text-dark-300"
        )}
      >
        {props.options.map((option) => (
          <RadioGroup.Option key={option.value} value={option.value}>
            {({ checked }) => (
              <div className={clsx("flex items-center gap-2 font-bold")}>
                <Radio
                  variant={props.variant || "accent"}
                  size={props.size || "md"}
                  checked={checked}
                />
                <span>{option.label}</span>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
