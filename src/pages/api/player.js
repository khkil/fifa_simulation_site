export default async function getPlayers() {
  const res = await fetch(`/api/players`);
  return res.json();
}
