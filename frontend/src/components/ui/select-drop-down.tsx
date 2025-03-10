import { Label } from "@/components/ui/field"
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./button"

export function SelectDropDown({
  items,
  title,
  placeholder,
  onChange
}: {
  items: Array<string>,
  title?: string,
  placeholder?: string,
  onChange?: (e: React.FormEvent<HTMLElement>) => void
}) {
  return (
    <Select aria-label="abc" className="w-[150px]" placeholder={placeholder} >
      {title && <Label>{title}</Label>}
      <SelectTrigger >
        <SelectValue />
      </SelectTrigger>
      <SelectPopover>
        <SelectListBox aria-label="abc" >
          {items.map((item) => (
            <SelectItem aria-label={item} key={item} value={{ label: item }}>
              <div onClick={onChange} className="bg-transparent w-full h-full text-black text-left justify-start">
                {item}
              </div>
            </SelectItem>
          ))}
        </SelectListBox>
      </SelectPopover>
    </Select>
  )
}
