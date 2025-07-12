import { getDay, format } from "date-fns";
import { id } from "date-fns/locale";

// Hitung status berdasarkan waktu scan dan aturan presensi
export function getPresenceStatus(
  scanDate: string,
  scanTime: string,
  presenceRuleList: IPresenceRuleItem[],
  scanType: "arrival" | "departure",
  presenceDay?: string
): "green" | "teal" | "yellow" | "red" | "gray" {
  try {
    const dayName = presenceDay?.toLowerCase() || format(new Date(scanDate), "EEEE").toLowerCase();
    const rule = presenceRuleList.find((r) => r.day.toLowerCase() === dayName);

    if (!rule || rule.is_holiday) {
      return "gray";
    }

    const [ruleHour, ruleMinute] = (scanType === "arrival" ? rule.start_time : rule.end_time).split(":").map(Number);
    const [scanHour, scanMinute] = scanTime.split(":").map(Number);

    const ruleTime = new Date();
    ruleTime.setHours(ruleHour, ruleMinute, 0, 0);

    const scan = new Date();
    scan.setHours(scanHour, scanMinute, 0, 0);

    const grace = rule.grace_period_mins;
    const tolerances = scanType === "arrival" ? rule.arrival_tolerances : rule.departure_tolerances;

    if (scanType === "arrival") {
      const diffMin = Math.floor((scan.getTime() - ruleTime.getTime()) / 60000);

      if (diffMin <= 0) return "green";
      if (diffMin <= tolerances[0] + grace) return "teal";
      if (diffMin <= tolerances[1] + grace) return "yellow";
      if (diffMin <= tolerances[2] + grace) return "red";
    } else {
      const diffMin = Math.floor((ruleTime.getTime() - scan.getTime()) / 60000);

      if (scan.getTime() >= ruleTime.getTime()) return "green"; // Pulang tepat waktu / lembur
      if (diffMin <= tolerances[0] + grace) return "teal"; // Pulang cepat level 1
      if (diffMin <= tolerances[1] + grace) return "yellow"; // Pulang cepat level 2
      if (diffMin <= tolerances[2] + grace) return "red"; // Pulang cepat level 3
    }

    return "gray";
  } catch (error) {
    console.error("❌ Error in getPresenceStatus:", error);
    return "gray";
  }
}
