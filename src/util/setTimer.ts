export const vercelTimer = () => {
    let controller = new AbortController();
	setTimeout(() => controller.abort(), 9000);
    return controller;
}