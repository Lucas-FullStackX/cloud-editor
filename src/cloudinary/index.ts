import { Cloudinary } from '@cloudinary/url-gen';
import { CLOUD_NAME } from '../constants';

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
});

export default cld;
