export function calculateDeliveryFee(area) {
    if (!area) return 0;

    const fees = {
        Bole: 50,
        Kazanchis: 60,
        Piassa: 70,
        CMC: 80,
        Saris: 90
    };

    return fees[area] || 100;
}

export function getDeliveryTime(area) {
    if (!area) return "30–45 min";

    const times = {
        Bole: "20–30 min",
        Kazanchis: "25–35 min",
        Piassa: "30–40 min",
        CMC: "35–45 min",
        Saris: "40–50 min"
    };

    return times[area] || "45–60 min";
}