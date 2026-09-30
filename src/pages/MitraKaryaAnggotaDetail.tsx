import { useParams } from "react-router-dom";
import MitraKaryaDetailContent from "@/components/mitra-karya/MitraKaryaDetailContent";

export default function MitraKaryaAnggotaDetail() {
  const { id } = useParams();
  const saved = JSON.parse(localStorage.getItem("mitra-karya-members") || "[]").find((member: { id: string }) => member.id === id);
  return <MitraKaryaDetailContent record={saved || { id: id || "A2600016", name: "Made Jaya" }} isCandidate={false} />;
}
