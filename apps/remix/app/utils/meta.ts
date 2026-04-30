import { type MessageDescriptor, i18n } from '@lingui/core';

import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';

export const appMetaTags = (title?: MessageDescriptor) => {
  const description =
    'Rejoignez hSign, l\'infrastructure de signature d\'hCloud, et bénéficiez d\'une expérience de signature 10 fois plus performante. À partir de 0€ par mois, pour toujours ! Connectez-vous dès maintenant et profitez d\'un processus de signature de documents plus rapide, plus intelligent et plus élégant. Intégrable à vos outils préférés, personnalisable et évolutif..';

  return [
    {
      title: title ? `${i18n._(title)} - hSign by hCloud` : 'hSign by hCloud',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content:
        'Signature éléctronique',
    },
    {
      name: 'author',
      content: 'hCloud (Damien Benedetti)',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'hSign - La signature électronique pour tous',
    },
    {
      property: 'og:description',
      content: description,
    },

    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@hcloud_fr',
    },
    {
      name: 'twitter:description',
      content: description,
    },
  
  ];
};
