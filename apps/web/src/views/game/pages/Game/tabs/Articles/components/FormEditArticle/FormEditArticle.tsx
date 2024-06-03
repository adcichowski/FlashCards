import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button/Button";
import { useEditArticle } from "../../hooks/useEditArticle";
import { schemaEditArticle } from "../../schema/articleSchemas";
import styles from "./FormEditArticle.module.scss";
import { Input } from "src/components/Input/Input";
import { ArticlePropType } from "../../ArticlesTab";
import { TitleRadio } from "../TitleRadio/TitleRadio";
import { MultiSelectTech } from "src/views/game/components/MultiSelectTech/MultiSelectTech";
export const FormEditArticle = ({ article: { id, ...article } }: { article: ArticlePropType }) => {
  const { mutate, data } = useEditArticle({ articleId: id });
  const { formState, register, handleSubmit, control, getValues, watch } = useForm({
    resolver: yupResolver(schemaEditArticle),
    defaultValues: { ...article, titleType: "title" },
  });
  const onSubmit = handleSubmit(async (data) => {
    // await mutate(data);
  });
  const titleType = watch("titleType");
  return (
    <section>
      <figure className={styles.articleFigure}>
        <img
          src={article.faviconUrl}
          style={{ width: "32px", height: "32px" }}
          alt={`favicon article ${article.title}`}
        />
        <figcaption className={styles.articleTitle}>
          {titleType === "heading" ? article.heading : article.title}
        </figcaption>
      </figure>
      <form onSubmit={onSubmit} className={styles.editForm}>
        <fieldset>
          <legend>Modify Article</legend>
          <TitleRadio name="titleType" control={control} />
          <div className={styles.inputAuthor}>
            <Input oneLine {...register("author")} error={formState.errors.url?.message} />
          </div>
          <MultiSelectTech showLabel />
          <div className={styles.buttonWrapper}>
            <Button type="submit" size="small">
              Set Article
            </Button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};
