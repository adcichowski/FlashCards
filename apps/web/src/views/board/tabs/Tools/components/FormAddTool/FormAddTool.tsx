import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button/Button";
import { Input } from "src/components/Input/Input";
import styles from "./FormAddTool.module.scss";
import { schemaAddTool } from "../../schema/toolSchemas";
import { MultiSelectField } from "src/views/board/components/MultiSelectTags/MultiSelectTags";
import { useGetTags } from "src/views/board/components/SearchByTags/hooks/useGetTags";
import { SelectForm } from "src/components/Select/Select";

const typeOptions = ["Program", "Plugin", "Package"].map((v) => ({ name: v, value: v.toLowerCase() }));

export const FormAddTool = ({ mutate }: { mutate: (data: { url: string }) => void }) => {
  const { data } = useGetTags();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schemaAddTool),
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className={styles.articleForm}>
      <Input {...register("url")} error={errors.url?.message} />
      <MultiSelectField error={errors.tags?.message} name="tags" control={control} items={data?.tags} />
      <SelectForm options={typeOptions} error={errors.type?.message} control={control} name="type" label="Type" />
      <div className={styles.buttonWrapper}>
        <Button type="submit" size="small">
          Save tool
        </Button>
      </div>
    </form>
  );
};
