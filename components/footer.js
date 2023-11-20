import Link from "next/link";

const Footer = () => {
  return (
    <div className="">
      <h1 className="">
        Built with{" "}
        <Link href="https://nextjs.org/">
          <span className="">Nextjs</span>
        </Link>{" "}
        and{" "}
        <Link href="https://supabase.com/">
          <span className="">Supabase</span>
        </Link>
      </h1>
      <Link href="">
        <p className="">Github Repo</p>
      </Link>
    </div>
  );
};

export default Footer;