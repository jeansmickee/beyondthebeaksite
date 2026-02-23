export default function SiteFooter() {
  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm opacity-80">
        © {new Date().getFullYear()} Beyond the Beak · Sri Lanka
      </div>
    </footer>
  );
}