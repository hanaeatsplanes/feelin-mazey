export async function GET({ params }: { params: { width: string, length: string, type: string }}) {
    const { width: sWidth, length: sLength, type } = params;
    const width = Number(sWidth)
    const length = Number(sLength)

    if (Number.isNaN(width) || Number.isNaN(length) || width < 1 || length < 1) {
        return new Response(JSON.stringify({error: "Width and length must be a number greater than 1"}))
    }

    switch (type) {
        case "prim":
            break;
    }
}