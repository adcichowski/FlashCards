import { PlusCircleIcon } from "lucide-react";
import React from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./ArticlesTab.module.scss";
import { Dialog } from "src/components/Dialog/Dialog";
import { Button } from "src/components/Button/Button";
import { useSaveArticle } from "./hooks/useSaveArticle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditArticle, schemaSaveArticle } from "./schema/articleSchemas";
import { Input } from "src/components/Input/Input";
import { useEditArticle } from "./hooks/useEditArticle";
import { ArticlesTable } from "./components/ArticlesTable";
import { useFetch } from "src/hooks/useFetch";
type ArticlePropType = {
  id: string;
  author: string | undefined;
  tags: string[] | undefined;
  title: string;
  createdAt: number | undefined;
  url: string;
};

export function ArticlesTab() {
  const { mutate, data: savedArticle } = useSaveArticle();
  useFetch();
  return (
    <div>
      <Dialog
        trigger={
          <button className={styles.buttonSaveArticle}>
            <Badge color="transparent">
              <div className={styles.badgeWrapperInsider}>
                <PlusCircleIcon className={styles.badgePlusCircle} size={20} /> Save Article
              </div>
            </Badge>
          </button>
        }
        children={savedArticle ? <FormEditArticle article={savedArticle} /> : <FormSaveArticle mutate={mutate} />}
        title={"Save Article"}
      />
      <ArticlesTable />
    </div>
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

const FormEditArticle = ({ article: { id, ...article } }: { article: ArticlePropType }) => {
  const { mutate, data } = useEditArticle({ articleId: id });
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schemaEditArticle),
    defaultValues: article,
  });
  const onSubmit = handleSubmit(async (data) => {
    // await mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className={styles.articleForm}>
      <Article {...article} />
      <Input {...register("url")} error={formState.errors.url?.message} />
      <Input {...register("author")} error={formState.errors.url?.message} />

      <div className={styles.buttonWrapper}>
        <Button type="submit" size="small">
          Get Article
        </Button>
      </div>
    </form>
  );
};

const Article = ({ author, title }: { author?: string; title: string; tag?: string[] }) => {
  return (
    <article className={styles.articleWrapper}>
      <h2 className={styles.articleHeading}>{title}</h2>
      <p className={styles.articleAuthor}>{author}</p>
    </article>
  );
};
