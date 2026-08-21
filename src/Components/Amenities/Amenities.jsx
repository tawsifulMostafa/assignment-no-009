"use client";

import { Checkbox, CheckboxGroup, Label } from "@heroui/react";

const controlClassName = "bg-success-soft before:bg-success";

const indicatorClassName =
  "**:data-[slot=checkbox-default-indicator--checkmark]:text-success-foreground";

const channels = [
  { label: "Whiteboard", value: "Whiteboard" },
  { label: "Projector", value: "Projector" },
  { label: "Wi-Fi", value: "Wi-Fi" },
  { label: "Power Outlets", value: "Power Outlets" },
  { label: "Quiet Zone", value: "Quiet Zone" },
  { label: "Air Conditioning", value: "Air Conditioning" },
];

export default function Amenities({ amenities, setAmenities }) {
  return (
    <div>

      <CheckboxGroup
        className="gap-3 p-4"
        name="amenities"
        value={amenities}
        onChange={setAmenities}
      >
        {channels.map(({ label, value }) => (
          <Checkbox key={value} value={value}>
            <Checkbox.Content>
              <Checkbox.Control className={controlClassName}>
                <Checkbox.Indicator className={indicatorClassName} />
              </Checkbox.Control>

              {label}
            </Checkbox.Content>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}