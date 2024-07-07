import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button/Button";
import { useEditArticle } from "../../hooks/useEditArticle";
import { schemaEditArticle } from "../../schema/articleSchemas";
import styles from "./FormEditArticle.module.scss";
import { Input } from "src/components/Input/Input";
import { ArticlePropType } from "../../ArticlesTab";
import { TitleRadio } from "../TitleRadio/TitleRadio";
import { MultiSelectField } from "src/views/game/components/MultiSelectTags/MultiSelectTags";
import { useGetTags } from "src/views/game/components/SearchByTags/hooks/useGetTags";
import { useGetArticles } from "../../hooks/useGetArticles";
import { useGetArticle } from "../../hooks/useGetArticle";
import { Loading } from "src/components/Loading/Loading";
export const FormEditArticle = ({ id }: { id?: string }) => {
  const { mutate, data, isPending } = useEditArticle({ articleId: id });
  const articleData = useGetArticle({ id }).data?.article;
  const { data: dataTags } = useGetTags();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schemaEditArticle),
    values: {
      author: articleData?.author || "",
      tags: articleData?.tags || [],
      title: articleData?.title || "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    await mutate(data);
  });

  if (isPending) return <Loading />;
  return (
    <section>
      <figure className={styles.articleFigure}>
        <img
          src={articleData?.faviconUrl}
          style={{ width: "32px", height: "32px" }}
          alt={`favicon article ${articleData?.faviconUrl}`}
        />
        <figcaption className={styles.articleTitle}>{articleData?.title}</figcaption>
      </figure>
      <form onSubmit={onSubmit} className={styles.editForm}>
        <fieldset>
          <legend>Modify Article</legend>

          <MultiSelectField error={errors.tags?.message} name="tags" control={control} items={dataTags?.tags} />
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
