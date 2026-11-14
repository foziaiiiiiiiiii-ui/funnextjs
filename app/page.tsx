import FingerprintInit from "@/app/components/FingerprintInit";
import SubscriberForm from "@/app/components/SubscriberForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-950 md:px-12 md:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl flex-col justify-center md:min-h-[calc(100vh-7rem)]">
        <div>
          <FingerprintInit />
          <h1 className="max-w-6xl font-sans text-[clamp(3.75rem,11vw,10rem)] font-semibold leading-[0.88] tracking-tighter">
            Be the first to
            <br />
            experience
            <br />
            the drop.
          </h1>
        </div>

        <section className="mt-12 max-w-xl md:mt-16">
          <h2 className="sr-only">Join the Ujala Wishlist</h2>
          <p className="mb-5 font-mono text-sm leading-6 text-neutral-600 md:text-base">
            Get notified when the Ujala app drops.
          </p>
          <div>
            <SubscriberForm />
          </div>
        </section>
      </div>
    </main>
  );
}
