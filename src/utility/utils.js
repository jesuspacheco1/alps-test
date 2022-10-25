import moment from "moment";
import axios from "axios";
import _ from "lodash";
import "moment/locale/es";
import { toast } from "react-toastify";

export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a",
    primary: "#19437d",
    neutral10: "#19437d",
    neutral20: "#ededed",
    neutral30: "#ededed",
  },
});

export const IndicatorItems = [
  {
    value: "uf",
    label: "Unidad de fomento (UF)",
    unidad_medida: "Pesos",
    mensual: 0,
  },
  {
    value: "ivp",
    label: "Indice de valor promedio (IVP)",
    unidad_medida: "Pesos",
    mensual: 0,
  },
  {
    value: "dolar",
    label: "Dólares observado",
    unidad_medida: "Pesos",
    mensual: 0,
  },
  {
    value: "dolar_intercambio",
    label: "Dólares acuerdo",
    unidad_medida: "Pesos",
    mensual: 0,
  },
  {
    value: "euro",
    label: "Euro",
    unidad_medida: "Pesos",
    mensual: 0,
  },
  {
    value: "ipc",
    label: "Indice de Precios al Consumidor (IPC)",
    unidad_medida: "Porcentaje",
    mensual: 1,
  },
  {
    value: "utm",
    label: "Unidad Tributaria Mensual (UTM)",
    unidad_medida: "Pesos",
    mensual: 1,
  },
  {
    value: "imacec",
    label: "Imacec",
    unidad_medida: "Porcentaje",
    mensual: 1,
  },
  {
    value: "tpm",
    label: "Tasa Política Monetaria (TPM)",
    unidad_medida: "Porcentaje",
    mensual: 0,
  },
  {
    value: "libra_cobre",
    label: "Libra de Cobre",
    unidad_medida: "Dólares",
    mensual: 0,
  },
  {
    value: "tasa_desempleo",
    label: "Tasa de desempleo",
    unidad_medida: "Porcentaje",
    mensual: 1,
  },
  {
    value: "bitcoin",
    label: "Bitcoin (BTC)",
    unidad_medida: "Dólares",
    mensual: 0,
  },
];

export const emailValidator = (text) => {
  return /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,63}$/i.test(
    text
  );
};

export const formatIndicator = (value, indicator) => {
  const symbol = ["Pesos", "Dólares"].includes(indicator.unidad_medida)
    ? "$"
    : "%";
  return `${Math.round(value * 100) / 100}${symbol}`;
};

export const getLastFiveYearsOptions = () => {
  const year = moment().format("YYYY");
  const lastFiveYears = Array.from(
    { length: 5 },
    (v, i) => year - 5 + i + 1
  ).reverse();

  return lastFiveYears.map((y) => ({ value: y, label: y }));
};

export const getDiffWithPrevDate = (prevValue, newValue) => {
  if (newValue === null || prevValue === null) return null;
  const decreaseValue = newValue - prevValue;
  return (decreaseValue / prevValue) * 100;
};

export const groupDataByMonth = (data) => {
  let months = _.groupBy(data, (d) =>
    moment(d.fecha.split("T")[0]).format("MM")
  );

  months = Object.keys(months)
    .map((key) => ({
      name: _.capitalize(moment(key, "MM").locale("es-es").format("MMMM")),
      short_name: _.capitalize(moment(key, "MM").locale("es-es").format("MMM")),
      num: key,
      total_month_avg:
        months[key].reduce((a, b) => a + b.valor, 0) / months[key].length,
      data: months[key],
    }))
    .sort((a, b) => parseInt(b.num) - parseInt(a.num));

  months = months.map((m, idx) => ({
    ...m,
    diff_with_prev: getDiffWithPrevDate(
      months[idx + 1]?.total_month_avg,
      m.total_month_avg
    ),
  }));

  return months;
};

export const groupDataByWeek = (data) => {
  let weeks = _.groupBy(
    data,
    (d) =>
      moment(d.fecha.split("T")[0]).week() -
      moment(d.fecha.split("T")[0]).startOf("month").week() +
      1
  );
  weeks = Object.keys(weeks).map((key) => ({
    name: `Semana ${key}`,
    num: key,
    total_week_avg:
      weeks[key].reduce((a, b) => a + b.valor, 0) / weeks[key].length,
  }));
  return weeks;
};

export const getIndicatorData = async (indicator, year) => {
  try {
    const { data } = await axios.get(
      `https://www.mindicador.cl/api/${indicator}/${year}`
    );
    return data;
  } catch (error) {
    if (error.request.status === 0) {
      toast.error("Conexión fallida.", {
        toastId: "error getIndicatorData",
      });
    }
    console.log(error);
    return false;
  }
};

export const setLogIn = async (credentials) => {
  try {
    const data = await axios.post("/api/login", credentials);
    localStorage.setItem("token", data.token);
    window.location.reload();
    return true;
  } catch (error) {
    if (error.response.status === 500) {
      toast.error("Conexión fallida.");
      return false;
    }
    const errors = Object.values(error.response.data).flat();
    errors.forEach((element) => {
      toast.error(element);
    });
    return false;
  }
};

export const setLogOut = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
