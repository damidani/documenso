import { Img } from '../components';

export interface TemplateImageProps {
  assetBaseUrl: string;
  className?: string;
  staticAsset: string;
}

import { APP_LOGO_URL } from '@documenso/lib/constants/app';

export const TemplateImage = ({ assetBaseUrl, className, staticAsset }: TemplateImageProps) => {
  const getAssetUrl = (path: string) => {
    return new URL(path, assetBaseUrl).toString();
  };

  if (staticAsset === 'logo.png' && APP_LOGO_URL) {
    return <Img className={className} src={APP_LOGO_URL} />;
  }

  return <Img className={className} src={getAssetUrl(`/static/${staticAsset}`)} />;
};

export default TemplateImage;
