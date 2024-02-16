import { PlusCircleIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import Badge from "src/components/Badge/Badge";
import styles from "./ArticlesTab.module.scss";
import { Dialog } from "src/components/Dialog/Dialog";
import { Button } from "src/components/Button/Button";
import { useSaveArticle } from "./hooks/useSaveArticle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEditArticle, schemaSaveArticle } from "./schema/articleSchemas";
import Image from "next/image";
import { useGetArticles } from "./hooks/useGetArticles";
export function ArticlesTab() {
  const { mutate, data } = useSaveArticle();
  const { data: articlesData } = useGetArticles();
  console.log(articlesData?.articles);
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
        children={data ? <h1>Tutaj będzie formularz z edycją</h1> : <FormSaveArticle mutate={mutate} />}
        title={"Save Article"}
      />
      <ul className={styles.articleList}>
        {articlesData?.articles?.map((article) => (
          <li key={article.id}>
            <Article {...article} />
          </li>
        ))}
      </ul>
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
      <label className="sr-only" htmlFor="urlArticle">
        Url to article
      </label>
      <input {...register("url")} placeholder="https://" name="url" type="text" className={styles.inputUrl} />
      <p className={styles.errorInfo}>{formState.errors.url?.message || " "}</p>
      <div className={styles.buttonWrapper}>
        <Button type="submit" size="small">
          Get Article
        </Button>
      </div>
    </form>
  );
};

// const FormEditArticle = () => {
//   const { formState, register, handleSubmit } = useForm({
//     resolver: yupResolver(schemaEditArticle),
//   });
//   const onSubmit = handleSubmit(async (data) => {
//     await mutate(data);
//   });
//   return (
//     <form onSubmit={onSubmit} className={styles.articleForm}>
//       <label className="sr-only" htmlFor="url">
//         Url to article
//       </label>
//       <input {...register("url")} placeholder="https://" name="url" type="text" className={styles.inputUrl} />
//       <p className={styles.errorInfo}>{formState.errors.url?.message || " "}</p>
//       <div className={styles.buttonWrapper}>
//         <Button type="submit" size="small">
//           Get Article
//         </Button>
//       </div>
//     </form>
//   );
// };

const Article = ({
  author,
  imageSrc,
  title,
  url,
}: {
  author?: string;
  title: string;
  imageSrc: string;
  url: string;
}) => {
  return (
    <Link href={url}>
      <article className={styles.articleWrapper}>
        <Image src={imageSrc} className={styles.articleImg} width={500} height={300} alt="" />
        <h2 className={styles.articleHeading}>{title}</h2>
        <p className={styles.articleAuthor}>{author}</p>
      </article>
    </Link>
  );
};
