"use client";
import { useModelStore } from "@/stores/model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DEFAULT_MODEL = ["gpt-3.5-turbo", "gpt-4", "gpt-4o"];

export function ModelSelect() {
  const { model: currentModel, updateModel } = useModelStore((state) => ({
    model: state.model,
    updateModel: state.updateModel,
  }));

  const handleChange = (selectedModel: string) => {
    updateModel(selectedModel);
  };

  return (
    <Select value={currentModel} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] text-xl">
        <SelectValue placeholder="모델을 선택해주세요." />
      </SelectTrigger>
      <SelectContent>
        {DEFAULT_MODEL.map((model) => (
          <SelectItem
            key={model}
            value={model}
            disabled={currentModel === model}
          >
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
