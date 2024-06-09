import { PlusCircleIcon } from "lucide-react";
import React from "react";
import styles from "./ArticlesTab.module.scss";
import { Dialog } from "src/components/Dialog/Dialog";
import { Button } from "src/components/Button/Button";
import { useSaveArticle } from "./hooks/useSaveArticle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSaveArticle } from "./schema/articleSchemas";
import { Input } from "src/components/Input/Input";
import { ArticlesTable } from "./components/ArticlesTable/ArticlesTable";
import { FormEditArticle } from "./components/FormEditArticle/FormEditArticle";
import { MultiSelectTech } from "src/views/game/components/MultiSelectTech/MultiSelectTech";
export type ArticlePropType = {
  id: string;
  heading: string;
  author: string | undefined;
  tags: string[] | undefined;
  title: string;
  createdAt: number | undefined;
  url: string;
  faviconUrl: string | undefined;
};

export function ArticlesTab() {
  const { mutate, data: savedArticle } = useSaveArticle();

  return (
    <>
      <MultiSelectTech id="technologies" name="technologies" />
      <Dialog
        trigger={
          <button className={styles.buttonSaveArticle}>
            <div className={styles.badgeWrapperInsider}>
              <PlusCircleIcon className={styles.badgePlusCircle} size={20} /> Save Article
            </div>
          </button>
        }
        children={savedArticle ? <FormEditArticle article={savedArticle} /> : <FormSaveArticle mutate={mutate} />}
        title={savedArticle ? "Saved Article" : "Save Article"}
      />

      <ArticlesTable />
    </>
  );
}

const FormSaveArticle = ({ mutate }: { mutate: (data: { url: string }) => void }) => {
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schemaSaveArticle),
  });
  const onSubmit = handleSubmit(async (data) => {
    await mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className={styles.articleForm}>
      <Input {...register("url")} error={formState.errors.url?.message} />
      <div className={styles.buttonWrapper}>
        <Button type="submit" size="small">
          Get Article
        </Button>
      </div>
    </form>
  );
};
