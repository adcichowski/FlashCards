import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
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
import { SearchByTags } from "src/views/game/components/SearchByTags/SearchByTags";
export type ArticlePropType = {
  id: string;
  author: string | undefined;
  tags: { name: string; id: string }[] | undefined;
  title: string;
  heading: string;
  createdAt: number | undefined;
  url: string;
  faviconUrl: string | undefined;
};

export function ArticlesTab() {
  const { mutate, data: savedArticle } = useSaveArticle();
  const [editArticle, setEditArticle] = useState<{ id: string } | undefined>(undefined);
  return (
    <>
      <SearchByTags />

      <Dialog
        manage={{
          open: !!editArticle,
          onOpenChange: () => {
            setEditArticle(undefined);
          },
        }}
        children={<FormEditArticle id={editArticle?.id} />}
        title={editArticle ? "Edit Article" : "Save Article"}
      />

      <Dialog
        trigger={
          <button className={styles.buttonSaveArticle}>
            <div className={styles.badgeWrapperInsider}>
              <PlusCircleIcon className={styles.badgePlusCircle} size={20} /> Save Article
            </div>
          </button>
        }
        children={<FormSaveArticle mutate={mutate} />}
        title={"Save Article"}
      />
      <ArticlesTable selectEditArticle={(article: { id: string }) => setEditArticle(article)} />
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
