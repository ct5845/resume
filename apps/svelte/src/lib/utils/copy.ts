export const copy = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (e) {
    console.error('Failed to copy:', e);
    return false;
  };
}