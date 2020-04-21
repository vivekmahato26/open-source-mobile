import React, {useState} from 'react';

import {View, Image} from 'react-native';

import {footerCss} from '../../constants/styles';

const footer = props => {
  const [notiImg, setNotiImg] = useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADQklEQVR4Ae3bAWQbYRjG8SEIDkFQFEUxDMUARRmGoiiKYgggCIqiCIaiCIoiGIKiKIIiCIoCgqAogiEogiI4vPsDBru8ct/d3WfPnx/ANt/T3F1u2yellFJKKaWUUkoFbh8ha6CDKRaYYYgThG4HUXeJFL2ABzKD/cMvJAhRD2ucIboaGMIAhBlhCttgEujw7S99RFOCCQwINkIP5nRawO8zQgO1rolnGBB0hAnM6amgkUd1v+w8wIDgI6xgTosCP2GDuA8f+I023JG5YYub+zvM6Qa1qg9zmmIHVN4AjvYwhzmdoRZ9RwpzuNvyRtbeYoBkyweIR5jDB76g0nbxXtC1s40OJhkDZ1njEedICrqczpGgsp4LOPw9jNyH7h/jFq0CRhiikjowh1t4auEaa1hBVrhA0zWC/3J0iFJrOS89E+c1/xBLWEnm+Oy8J8ydv14DpTV0Pou3salzrGEle8eR82Xiyv/dpvgOYBuk+IpN/YRVKEUHmzpxPhW1UHijQF9UerAaSHGM7Hw35T4KbR+p49KT+L87VM/5TL+LleOy1kRhDWAbnDhG/IDVjOee1avyXpA4bpYz/zv9WhoiqyaWjiEL6TzAT/8prMZSHAT4FBwieJOcP/1NvMFqbhrgUzBA0NqOm2YXWXVhkThGVjeO1+2lvnZIHTewGSwSDwG+Cx2W+ew/9vyBI7J2/EDNYRmuEKxXWIYfnsfXyHRz/iXUGEFqwTbYQ1ZLWGSekdWR481rkI5z3nB2YRFab3jDmTgeTPaRu0tYhvtYn/0dDpDVSxl/b3wHy3DpeWSLVDfn2Vwgd4+wDOfI6gkWqTtkdVXGP195yfm8O4dFapzz9cw9crfI+QS0gEVqmvNJaIrKW8Mi9Yros4gtNEDVYk8DaAANEC0NoAE0QARpAA2gATSABtAAGkADaAANoAE0gAbQABpAA2gADaABNIAG6MEi19Pha4TiD18j6PA9ejp8jeA/fI2gwy9+BB2+RrD/mwbQABHQABogrpRSSqmk+v9kpz5gW5pA5ewetqU+VM6+wbawxj4CpMZbDHCNQKkWXmFOD2ggYCpxfBJS3BR7+OoIIyxhMLxhgAMopZRSSimlVK37A9kFHvwu9/6IAAAAAElFTkSuQmCC',
  );
  const changeNotiStatus = args => {
    setNotiImg(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB5UlEQVR4Ae3cAWQbYRiH8SEogiIYhqEYhgBgCDAUQwEFBFAEAwAUQzEUQzAEMAxFEQTDAEFRDIchGIricHj3AArRnNz1u+/yPPwA4P2LxJF7ZR3PzMzMzMzMbIApViiwxhyfYC33GmvEFt8xhLXUCvGMJayFZogdncEabonY0S2s4R4QOypgDRc1mQP0pxGipiFsj0aYYokKUVOJnzivN4a9xQIVoiElrnEM29IxvqBEtOQBn3EEe9IHbBAv5A7vYHSOEvHC/mGCg+4SkVCFqc920o9wioPqIypERzziPQ6iEzwiOqbAyGf6ac3R684QHVZhjF52hD+Ijluhl10gMnGK3rVGZOIHetUYkZESI/Smr4jMXKA3bRCZ+YVe9AaRoRIDf/unNUb2XSHS8XvgFpGpb8i+O0SmbpB9BSIdH0uUiEzdI/siY4UDpOcADuAADuAADpBpDuAADuAADuAADuAADuAADuAADuAADuAADuAADuAADpAB/4qa3szjO0LS4zuCxwcw8/iOkOT4juDxt4zg8R0hDpwDOED+HCBbPc7MzCz28BcJ800rv2F7tthjgEvYnk0QdaHCCRrIbhA1XaGhbIh7xI5WGKDBbLjjJ+Ha47fbBAtsEAgUmGMMMzMzMzOzTvcfWQoL2Bulxz8AAAAASUVORK5CYII=',
    );
  };
  return (
    <>
      <View style={footerCss.container}>
        <Image
          style={footerCss.buttons}
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAABZElEQVR4AezXAUYFURhA4TCAWcAAQgghBAjREkLLuMsIg5YQQgsIIUAILWCWMAsYwOB2EIjU+933fo1z+BZxjv5JZmZmZmZmZmZmIwoOnHV4Qv0y4kBZj1fUbx7RwfbYgA/UH7ygh+2hU0yov3jHgIbZBWbUP5pwggbZNRbUHc04h0WjW6yoQQuuYIEKagMrbrBDdo/amMMWGKzWHLbAYLXmsAUGK85hiw9Wcw5bYLACHLbAYCUIDJuD1YDDVlATBIbNwcpQHKx8o4MVkDBsDlbCsDlYScPmYDlsmYOVb8aZg5VrwaWD5bAlD1a+FcXBynfnYOV7QJc7WHpGnztYesOQO1iacLyBwXLYEgbLYdvIYDlsdeM+26MDEgAAAARA/183IgIIveCeAAECBAgQIECAAAECKgIECBAgQIAAAQIECBAgQIAAAQIECBBwGCBAgAABAgQIECBAgAABAgQAAAAAAAAE1WQQyh0sgoQAAAAASUVORK5CYII=',
          }}
        />
        <Image
          style={footerCss.buttons}
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAC8ElEQVR4Ae3bAWQyYRzH8RchhGEYhjAMYRiGIcIQhgGGEMIAwxDCAAFCGMIwhBBCGEIIIcAQwjAMIRz+79drwLa3uru65+5+Xz4AHD/ueu70RymllFJKKaUcK4czXKGCBtroYYz5lxG6aKGOCkooIIstUoeooo8VLKAlXnCLHH5IneABI9gOeRjiDsdIfTeYwSIyRhGpq4gxzBEDnCHxFdCDOchDB3kkriN04MEct0ITB0hERXzAYmaOAmJdFR4sppYoI3Zl0IIlgIc6YtMBhrCEeUYWTneKN1hCTXAEJzvEHJZwE2ThVBm8wlLiGU71BEuZOpyoBkshD2VEWgkeLKWWKCCS8viEpdwcB9h7XZj808Reu4AJgBXy2FuvsIisyyLSwV4qwzTANx7OsNMymGmAXw2w0yowDfBfReysdw2w1hg76RKmATZyjNBraoCN3SH03jTAxoYItVPYxjSAhxxCq64BtnaL0BprgK29IJSOYVvTAEtkEbiyBvCtgMBVNYBvJQSuoQF8q0T7wV0D1BG4Piw07mchaiFwEw3gWxeBW2gA30bRXpAGmEd7QRpgEe1HGA0wRuCmGsC3HgI30AC+tRG4jg5ivjUS8CpCryJqGsC3KwTuWgP4dobAnWgAX1bIIZRmGmBrfYTWowbYWhWhda4BtnaIUFtogI2NEHptDbCxB4ReSQNs7AShl8GnBlhrhp11rwHWusHOymKuAX41xs6raIBfFbGXphrgmx721hUMgHgogKL4s7Z0sPcKWMFS7gNHiKRb3Xp48EbcIyylqnCiPixlWnCmHGawlBgiA6fK4wOWcG84gJNdJnyEOU7hdPmE3o5ecYhYlEvYg/kpmnu+fqJ6qCHW3cb0xPyJEhJRIWbvjrrII3FdYer4g/YCia+COcwRM5SRqrK4j/hD/zsqyCC1ZVBCG4s9nWSbuMQPqXM8hnyYG6OOU2yROsE1amiggwGmeId9WWCCPp7QQBVlHMOZlFJKKaWUUuov+JMzms1qH2EAAAAASUVORK5CYII=',
          }}
        />
        <View onPress={changeNotiStatus}>
          <Image style={footerCss.buttons} source={{uri: notiImg}} />
        </View>
      </View>
    </>
  );
};

export default footer;
