import api from "../../api";

async function getCupom(cupom) {
  const { data } = await api.get(`/cupom/${cupom}`);
  return data;
}

async function confirmaCupom(cupom) {
  const { data } = await api.post(`/cupom/${cupom}`);
  return data;
}
export default { getCupom, confirmaCupom };
