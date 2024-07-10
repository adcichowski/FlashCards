import React from "react";
import { RadioGroupItem, RadioGroup } from "src/components/RadioGroup/RadioGroup";
import styles from "./TitleRadio.module.scss";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import clsx from "clsx";
import { Circle } from "lucide-react";
export const TitleRadio = <T extends FieldValues>({ control, name }: { control: Control<T>; name: Path<T> }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className={styles.radioGroup}>
          <div className={clsx(styles.item, styles.title)}>
            <RadioGroupItem value="title" className={styles.groupItem} id="title">
              <Circle className={styles.circleIcon} />
            </RadioGroupItem>
            <label htmlFor="title">Title</label>
          </div>
          <div className={clsx(styles.item, styles.heading)}>
            <RadioGroupItem value="heading" id="heading" className={styles.groupItem}>
              <Circle className={styles.circleIcon} />
            </RadioGroupItem>
            <label htmlFor="heading">Heading</label>
          </div>
        </RadioGroup>
      )}
    />
  );
};
