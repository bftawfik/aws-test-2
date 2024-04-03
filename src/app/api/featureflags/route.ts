import { NextRequest } from 'next/server';
import { getDevelopFeatureFlags } from '../../../featureflags';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const host = request.headers.get('origin');
    return new Response(
        JSON.stringify(getDevelopFeatureFlags(body.keys, host))
    );
}
