import {
  CertificateVerifyDisplay,
  CertificateNotFound,
} from '@/features/certificates/components/CertificateVerifyDisplay';
import type { PublicCertificateResponse } from '@/types/api';

// Never cache — each scan increments verifiedCount
export const dynamic = 'force-dynamic';

async function getCertificate(token: string): Promise<PublicCertificateResponse | null> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/certificates/verify/${token}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const cert = await getCertificate(token);

  if (!cert) return <CertificateNotFound />;
  return <CertificateVerifyDisplay cert={cert} />;
}
