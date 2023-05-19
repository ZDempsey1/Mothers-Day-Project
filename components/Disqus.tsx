// import { DiscussionEmbed } from 'disqus-react';

// <DiscussionEmbed
//     shortname='https://plant-help.disqus.com/embed.js'
//     config={
//         {
//             url: this.props.article.url,
//             identifier: this.props.article.id,
//             title: this.props.article.title,
//             language: 'en' //e.g. for english
//         }
//     }
// />


// import dynamic from 'next/dynamic';

// const LazyDiscussionEmbed = dynamic(() => import('disqus-react').then((module) => module.DiscussionEmbed), {
//   ssr: false // Disable server-side rendering for this component
// });

// interface DisqusCommentsProps {
//   url: string;
//   identifier: string;
//   title: string;
// }

// const DisqusComments: React.FC<DisqusCommentsProps> = ({ url, identifier, title }) => {

//     return (
//         <div>
//         {/* Other JSX components */}
//         <LazyDiscussionEmbed
//             shortname='https://plant-help.disqus.com/embed.js'
//             config={{
//             url,
//             identifier,
//             title,
//             language: 'en' // Set language to English
//             }}
//         />
//         </div>
//     );
// };

// export default DisqusComments;


import dynamic from 'next/dynamic';

const LazyDiscussionEmbed = dynamic(() => import('disqus-react').then((module) => module.DiscussionEmbed), {
  ssr: false, // This line will load Disqus on client-side only
});

interface DisqusCommentsProps {
  url: string;
  identifier: string;
  title: string;
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({ url, identifier, title }) => {
  const shortname = "plant-help"; // This should be your Disqus "shortname"

  return (
    <LazyDiscussionEmbed
      shortname={shortname}
      config={{
        url,
        identifier,
        title,
        language: 'en', // Set language to English
      }}
    />
  );
};

export default DisqusComments;
