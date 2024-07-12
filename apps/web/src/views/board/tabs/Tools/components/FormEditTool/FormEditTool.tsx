import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button/Button";
import { optionsTypeTools, schemaEditTool } from "../../schema/toolSchemas";
import styles from "./FormEditTool.module.scss";
import { MultiSelectField } from "src/views/board/components/MultiSelectTags/MultiSelectTags";
import { useGetTags } from "src/views/board/components/SearchByTags/hooks/useGetTags";
import { useGetTools } from "../../hooks/useGetTools";
import { useGetTool } from "../../hooks/useGetTool";
import { Loading } from "src/components/Loading/Loading";
import { SelectForm } from "src/components/Select/Select";
import { Input } from "src/components/Input/Input";
import { useEditTool } from "../../hooks/useEditTool";
export const FormEditTool = ({ id }: { id?: string }) => {
  const { data, isLoading } = useGetTags();
  const { mutate, isPending } = useEditTool({ toolId: id });
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schemaEditTool),
  });
  const onSubmit = handleSubmit(async (data) => {
    await mutate(data);
  });
  if (isLoading) return <Loading />;
  return (
    <form onSubmit={onSubmit} className={styles.articleForm}>
      <Input {...register("name")} error={errors.name?.message} />
      <MultiSelectField error={errors.tags?.message} name="tags" control={control} items={data?.tags} />
      <SelectForm
        options={optionsTypeTools.map((type) => ({ value: type, name: type }))}
        error={errors.type?.message?.toString()}
        control={control}
        name="type"
        label="Type"
      />
      <div className={styles.buttonWrapper}>
        <Button type="submit" size="small">
          Save tool
        </Button>
      </div>
    </form>
  );
};
