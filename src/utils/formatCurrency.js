export function formatCurrency(amount) {
    return `ETB ${Number(amount).toLocaleString("en-US")}`;
}