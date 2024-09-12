import Image, { StaticImageData } from "next/image";

const IconImage: React.FC<{ src: StaticImageData; text: string; width?: number; height?: number }> = ({
    src,
    text,
    width = 20,
    height = 20,
  }) => {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Image src={src} alt={text} width={width} height={height} className="object-contain" />
      </div>
    );
  };
  

export default IconImage;