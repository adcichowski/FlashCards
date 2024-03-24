import { toast } from "sonner";
import { useCreateRateForArticle } from "./useCreateRateForArticle";
import { useUpdateRateForArticle } from "./useUpdateRateForArticle";
import { MouseEventHandler } from "react";
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

    if (rateId) {
      toast.promise(mutateUpdateRate({ articleId, rate: logicOfRating, rateId }), {
        success: "Successfully update rate",
      });
    }
    if (!rateId) {
      toast.promise(mutateCreateRate({ articleId, rate }), {
        success: "Successfully create rate for article",
      });
    }
  };
  return { handleRateArticle };
};
