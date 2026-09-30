import { useParams } from "react-router-dom";
import MitraKaryaDetailContent from "@/components/mitra-karya/MitraKaryaDetailContent";

export default function MitraKaryaCalonAnggotaDetail() {
  const { id } = useParams();
  const saved = JSON.parse(localStorage.getItem("mitra-karya-calon-anggota") || "[]").find((item: { id: string }) => item.id === id);
  return <MitraKaryaDetailContent record={saved || { id: id || "CA2600016", name: "Calon Anggota Baru" }} isCandidate />;
}
