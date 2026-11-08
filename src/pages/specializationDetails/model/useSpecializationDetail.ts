import {
  useDeleteSpecializationMutation,
  useGetSkillsQuery,
  useGetSpecializationQuery,
} from "@/entities";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const useSpecializationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: specialization, isLoading: loadingSpec } =
    useGetSpecializationQuery(Number(id));
  const { data: skills, isLoading: loadingSkills } = useGetSkillsQuery({
    specializations: [Number(id)],
    limit: 1000,
  });
  const [deleteSpec, { isLoading: isDeleting }] =
    useDeleteSpecializationMutation();

  const fromPage = location.state?.fromPage || 1;

  const handleDelete = async () => {
    if (!id) return;

    const isConfirmed = window.confirm(
      "Вы уверены, что хотите удаить эту специаизацию?",
    );

    if (isConfirmed) {
      try {
        await deleteSpec(Number(id)).unwrap();
        navigate(`/specializations?page=${fromPage}`);
      } catch (err) {
        const error = err as FetchBaseQueryError;
        console.error("Ошибка удаления:", err);

        if (error.status === 403) {
          alert(
            "У вас нет прав на удаление этой специализации. Требуются права администратора",
          );
        } else {
          alert("Не удалось удалить специализацию");
        }
      }
    }
  };

  return {
    specialization,
    loadingSpec,
    loadingSkills,
    isDeleting,
    skills,
    id,
    handleDelete,
  };
};
