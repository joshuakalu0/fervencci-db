import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Rotator() {
  const query = useRouter();
  const table = query.asPath.split("/")[3] || "user";
  return (
    <div className='rotator-wrapper'>
      <Link href={`/dashboard?page=${table}`}>
        <span className='rotator rotator-b'></span>
        <span className='rotator rotator-m'></span>
        <span className='rotator rotator-n'></span>
        <span className='rotator rotator-v'></span>
        <span className='rotator-icon'>
          <ArrowBack />
        </span>
      </Link>
    </div>
  );
}
export function RotatorLinkless({ direction, Click }) {
  return (
    <div className='rotator-wrapper'>
      <span className='rotator rotator-b'></span>
      <span className='rotator rotator-m'></span>
      <span className='rotator rotator-n'></span>
      <span className='rotator rotator-v'></span>
      <span className='rotator-icon'>
        {direction == "forword" ? (
          <ArrowForward onClick={Click} />
        ) : (
          <ArrowBack onClick={Click} />
        )}
      </span>
    </div>
  );
}
