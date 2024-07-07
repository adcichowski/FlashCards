import { toast } from "sonner";
import { useCreateRateForArticle } from "./useCreateRateForArticle";
import { useUpdateRateForArticle } from "./useUpdateRateForArticle";
export const useManageRateArticle = ({
  articleId,
  rateId,
  yourRated,
}: {
  articleId: string;
  rateId: string | undefined;
  yourRated: number | undefined;
}) => {
  const { mutateAsync: mutateCreateRate } = useCreateRateForArticle();
  const { mutateAsync: mutateUpdateRate } = useUpdateRateForArticle();

  const handleRateArticle = ({ rate }: { rate: number }) => {
    const logicOfRating = yourRated === rate ? 0 : rate;
    console.log(logicOfRating);

    if (rateId) {
      toast.promise(mutateUpdateRate({ articleId, rate: logicOfRating, rateId }), {
        success: "Successfully update rate article",
      });
    }
    if (!rateId) {
      toast.promise(mutateCreateRate({ articleId, rate }), {
        success: "Successfully rate article",
      });
    }
  };
  return { handleRateArticle };
};
