import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  Text,
  Button,
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';

import colors from '../../constants/colors';
import {projectCard, line, standard} from '../../constants/styles';
import {FlatList} from 'react-native-gesture-handler';

const project = props => {
  const [filterProj, setFilterProj] = useState({
    tag: null,
    category: null,
  });
  const [projects, setProjects] = useState([]);
  const [length, setLength] = useState({length: 0});
  const [activeId, setActiveId] = useState([]);
  const [filter, setFilter] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  //const [prevFilter, setPrevFilter] = useState(null);
  const [comment, setComment] = useState([]);

  const handleFilter = (filter, type) => {
    setPage(0);
    setFilter(true);
    let filterP;
    if (type === 'category') {
      filterP = {
        tag: null,
        category: filter,
      };
      fetchProjects(null, filter);
    }

    if (type === 'tag') {
      filterP = {
        tag: filter,
        category: null,
      };
      fetchProjects(filter, null);
    }

    setFilterProj(prevState => filterP);
  };

  const handleLike = index => {
    let args;
    let placeholder = [];
    let tempArr = activeId;

    if (activeId[index].liked) {
      args = {
        id: activeId[index].projectId,
        index,
        action: 'dislike',
      };
      handleLikeProject(args);
      tempArr[index].liked = false;
      tempArr[index].count = tempArr[index].count - 1;
      tempArr[index].userIds.filter(function(params) {
        var id = params._id;
        return id !== userId;
      });
      setActiveId(prevState => [...placeholder, ...tempArr]);
    } else {
      args = {
        id: activeId[index].projectId,
        index,
        action: 'like',
      };
      tempArr[index].liked = true;
      tempArr[index].count = tempArr[index].count + 1;
      tempArr[index].userIds.push({_id: userId});
      handleLikeProject(args);
      setActiveId(prevState => [...placeholder, ...tempArr]);
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScrollEnd = () => {
    setPage(prevState => prevState + 1);
    setRefreshing(true);
    setIsFetching(true);
  };

  const handleRefresh = () => {
    setPage(prevState => 0);
    setRefreshing(true);
    setIsFetching(true);
  };

  const userId = '';
  const fetchProjects = (tag, category) => {
    if (tag) {
      tag = `"${tag}"`;
    } else {
      tag = null;
    }
    if (category) {
      category = `"${category}"`;
    } else {
      category = null;
    }
    const requestBody = {
      query: `
                query {
                  projects(projectFilter:{tag:[${tag}],category:${category},userId:null}){
                    _id
                    icon
                    name
                    desc
                    organization{
                      name
                      website
                    }
                    slug
                    tag
                    category
                    createdAt
                    likes {
                      _id
                    }
                    admin {
                      _id
                      sname
                    }
                    community {
                      github
                      website
                      slack
                      facebook
                      discord
                      twitter
                    }
                    comments {
                      message
                      user {
                        _id
                        profilePic
                        sname
                      }
                      children {
                        message
                        user {
                          _id
                          profilePic
                          sname
                        }
                      }
                    }
                  }
                }
              `,
    };

    fetch(`http://192.168.43.186:8000/graphql?page=${page}&records=${4}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const projectArr = resData.data.projects;

        projectArr.map(p => {
          var like = {
            projectId: p._id,
            userId: p.likes,
          };
          var ifLiked = false;
          like.userId.map(uid => {
            if (uid._id === userId) {
              ifLiked = true;
            }
            return uid;
          });
          setActiveId(prevState => [
            ...prevState,
            {
              id: activeId.length,
              projectId: like.projectId,
              userIds: like.userId,
              count: p.likes.length,
              liked: ifLiked,
            },
          ]);
          return p;
        });
        if (projectArr.length === 0) {
          setIsFetching(false);
          setRefreshing(false);
          if (tag || category) {
            if (page !== 0) {
              setIsFetching(true);
              setRefreshing(false);
              return;
            }
            setRefreshing(false);
            setIsFetching(true);
            setProjects(prevProjects => [...projectArr]);
          }
        } else if (tag || category) {
          setIsFetching(false);
          setProjects(prevProjects => [...projectArr]);
        } else {
          setIsFetching(false);
          setProjects(prevProjects => [...prevProjects, ...projectArr]);
        }
        if (refreshing && page === 0) {
          setIsFetching(false);
          setProjects(prevProjects => [...projectArr]);
        }
        setRefreshing(false);
        return;
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!isFetching) return;
    if (filter) {
      fetchProjects(filterProj.tag, filterProj.category);
      return;
    }
    fetchProjects();
  }, [isFetching]);

  const handleLikeProject = args => {
    let requestBody;
    if (args.action === 'like') {
      requestBody = {
        query: `
                  mutation {
                    addLikes(projectId:"${args.id}"){
                      _id
                      likes {
                        _id
                      }
                    }
                  }
                `,
      };
    }
    if (args.action === 'dislike') {
      requestBody = {
        query: `
                  mutation {
                    dislike(projectId:"${args.id}"){
                      _id
                      likes {
                        _id
                      }
                    }
                  }
                `,
      };
    }

    fetch(' http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          window.location.assign(
            `http://${window.location.hostname}:${window.location.port}/signin`,
          );
        } else {
          return resData;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (length.length === 0) {
    fetchProjects();
    setLength({length: 4});
  }

  //   if (prevFilter !== props.filterProject.exec) {
  //     setPage(0)
  //     if (props.filterProject.tag) {
  //       setFilter(true)
  //       let filterP = {
  //         tag: props.filterProject.tag,
  //         category: null
  //       }
  //       setFilterProj(filterP)
  //       setIsFetching(true)
  //       fetchProjects(props.filterProject.tag, null)
  //     }
  //     if (props.filterProject.category) {
  //       setFilter(true)
  //       let filterP = {
  //         tag: null,
  //         category: props.filterProject.category
  //       }
  //       setFilterProj(prevState => filterP)
  //       setIsFetching(true)
  //       fetchProjects(null, props.filterProject.category)
  //     }
  //     setPrevFilter(props.filterProject.exec)
  //   }

  const handleComment = (event, pid) => {
    const form = event.target;
    //event.preventDefault();

    const requestBody = {
      query: `
            mutation{
              postComment(commentInput:{message:"${
                form.comment.value
              }",project:"${pid}"}){
                message
                user {
                  _id
                  profilePic
                  sname
                }
              }
            }
          
          `,
    };
    fetch(' http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          window.location.assign(
            `http://${window.location.hostname}:${window.location.port}/signin`,
          );
        } else {
          return resData;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderRow = (project, index) => {
    let likedCss = activeId[index].liked
      ? projectCard.actionImg
      : {...projectCard.actionImg, tintColor: colors.primary};
    return (
      <View key={project._id} style={projectCard.container}>
        <View style={projectCard.title}>
          <TouchableWithoutFeedback>
            <View style={standard.flexRow}>
              {project.icon && (
                <Image
                  style={{...standard.img, marginEnd: 5}}
                  source={{uri: project.icon}}
                />
              )}
              <Text>{project.name}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={standard.flexRow}>
              {project.organization ? (
                <>
                  {project.organization.logo && (
                    <Image
                      style={{...standard.img, marginEnd: 5}}
                      source={{uri: project.organization.logo}}
                    />
                  )}
                  <Text>{project.organization.name}</Text>
                </>
              ) : (
                <>
                  {project.admin.profilePic && (
                    <Image
                      style={{...standard.img, marginEnd: 5}}
                      source={{uri: project.admin.profilePic}}
                    />
                  )}
                  <Text>{project.admin.sname}</Text>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableNativeFeedback>
          <View style={projectCard.categoryContainer}>
            <Image
              style={projectCard.categoryImg}
              source={{
                uri:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACeUlEQVR4Ae3bAWRqYRjG8YuD4WC4uAhDgAGGACMMEEKAIQwQYBguYIAwhIsBwhDCwTCEEEIIF0MYhosQwnv/CMpNp875znfuvufPDwC8It9T35RSSimllFLqP6uJGjykYiwwQYSCU13YRgcFpi6xhm38wQ8UlBrDdvRRQKoN26MO5bDv+ITtMccZlKN+wQ54gINUDZbCChdQORZhBkspgcqxDuxIDagcqmAJO9ICMVTG+rATPUJl6AaWwRqXOCF1ht+wjEY4IfUTlpNbqCOqYgXLySfOkTKVwHLWQ4pUC+ZIDSnSymUupFzPtHI51sGBtHI5dHg908rlXh8H0srlWh1baeVy5fB6ppXLkwdo5fJohQutXH4lWrn8a2jlKpTWsz6sZB61cvm1xqVWLr9GWrn8u9XK5YTWswTmm9Yz/ymllFJKKaVUjAZ6GGCM940RXvCEujbkfLvB8MjnkSX6qMFb5lX2rvAGy2iAqg6QvghdBxvCvQ5wuNjxY+AzIh3g351jXtCYE+kA20V4hRXkWQfYrgcr2D1IB7j2OO5XEfwBpjBPBqEfoAXzrBbyAcYwz/qhHqACK4ElzkI8QBtWEvUQDzCElcRTiAeYwEriJcQDLGAlMQrxAFYi7zqAX4sQD/ABK4lxiAeYwkpiEOIBkq/+K2vzSf++LP8BqrASWCEO9TFuBvNsGPJr6B3Ms5uQDxB5/jfmG4JfxJowT650AKIBrGBdbNIBYkxhBUkQ6QDbVQp6npgjBukAu1UcfxJecQ7SAfYVY+DouSEC6QBpaub0FXWKa5yQinCH2YlPzC3klKqigwRTfOwMKhMM0UYFmVJKKaWUUkqpv3BI/mdqzu+tAAAAAElFTkSuQmCC',
              }}
            />
            <Text
              style={projectCard.category}
              onPress={() => handleFilter(project.category, 'category')}>
              {project.category}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View>
          <Text>{project.desc}</Text>
        </View>
        <View style={projectCard.tag}>
          {project.tag.map((t, index) => {
            return (
              <Text
                key={index}
                style={projectCard.tagItem}
                onPress={() => handleFilter(t, 'tag')}>
                #{t}
              </Text>
            );
          })}
        </View>
        <View style={line.css} />
        <View style={projectCard.actions}>
          <TouchableNativeFeedback onPress={() => handleLike(index)}>
            <View style={standard.flexRow}>
              <Image
                style={likedCss}
                source={{
                  uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAACEUlEQVR4Ae3bAWQbURzH8eEQBAUEw1AURQDBgGAYiiKAIRiKoiiKoBgggCEIiiIIhqIIggCCIAiC4DAMhyH47YuOwVlf7t6l997/ywcAfhz/h3tnWZZlWZZlWT77gGs8YIYNti+WGOMKpyjaOW7wiBW2L9aYYYw+WjhqCb5iBTlY4QoNvLYT3GILOVigh8rrYQMVkKKP3CjBLX5BBSzRhfcSjKASPed8DqdYQiUawFstzCEPUrTxty4yyIMpmii1BhaQRxk6uMAe8miKUhtDFUiRQRUYoJT6UKC6KFQDKRSoJQp1CwWuh4NLocAtcFAdKBItOHcPRaIP52ZQJMZwbgtFYgbnfkORWMM5RWQH5zIoEis4t4Yi8QTnnqFIjODcCIrEHZzrQZHowLkGMihwGxzcAxS4exzcBRS4Ng4uwRIK1A8U7hMUoD3OkZPdRCOUVht7KBAZWii1ARSILyi9BDOo5h7hrff4WfOjsAmvfYZqaI82KukGqplLVNoQqokbVF6CCfTGDXG0GphDb9QECY5aE3Mbp/qRPI1jI83zx7GR5vmHoI30lD+OjTRBglrVxATybORhnGCOySFqX+LpWXKHoPoGleQaQXYNFbDHJYLuEnvIUYYuosj1Z5UUHxFVHaTQf+xwhig7ww7KsUYLUdfCOudddQKyTjCHIEzQxD9ZTUzxPf/pYCWwLMuyLMuqoj99IMBOVxjRTAAAAABJRU5ErkJggg==',
                }}
              />
              {activeId[index].count !== 0 && (
                <Text>{activeId[index].count} Likes</Text>
              )}
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              console.log('like');
            }}>
            <View>
              <Image
                style={projectCard.actionImg}
                source={{
                  uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAACS0lEQVR4Ae3ZAaRaURjA8eHgIoQQwkMIw8MQAsIQwhCGhzA8hGEIQwjDxTAM4SKEh2EI4SKEIYSHEEK4CA/h2x8PhDp352J95/z5AcCR85379SYUCoVCodB/UBMxlti+SjHCW3hbHXPIFVNU4VUtZBBLOzTgRQ0cITntUIX6lpB/NIXqOhBHqi/uBOJoBLXtII5SqE0KsA0HdNkOajtAHC2hLoNHHCGOYqiqjTWkIE2o6A4zSIHmuPkijPACKVCGOm66nuVbZ53zAI9o4Wa7Rwq54oA+DO6xtpxaDdxkFfzACXLBCTHKOJ9uPcxwOHvrJOjc+tjOLC/WBnTmMLaf0YXOHMb2EUNEapfkDmM7QU37kjxBOefYXqHl05J8m39s+7cktx/bPi7J7cd2WJKfj+2wJFcxtsOSPCzJFSzJFbSHOFpBbU8QR3t8hMp6kIKkeAdVGWwKfkH/RAVqauIEKVCGzzBQ0Yech5ThGXLFBu81/ZI2lnfNHSIMLT90f6Gu5U7q4Ql7yyV5zfKT5QVjlOBlLazcnwW6M+jjYPl/VhNeVkZsefFPUIWXNTC3nIpfYHBehA5iJJhgjDYMVNTF1mbpdvYseLzyvbjDA1QUYWj599DvV2IpgYGKaphCCpZofBb8gRToAaoy+IRDgcs7o/VZ8L2gj+Y21DaBOBpDbQuIownUloZpdrkZxNE3qG0AcdSF2mqOkyxDBNXFDgc0gPpKWENymsPAi6o5D2nh4yq3ZLF0O+IrDLythgFmSLHAFH1U4FmhUCgUCv0FJo/es+wD9nkAAAAASUVORK5CYII=',
                }}
              />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              console.log('like');
            }}>
            <View>
              <Image
                style={projectCard.actionImg}
                source={{
                  uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAA4UlEQVR4Ae3agQUCQBiG4RBCA7RRA4QAARqgQRoghEYIITRACCFAAzTE9QMQf5yk7p6Xb4EHd44bNJ0kScPYInaM3WPlz3eJbWLTT+BMYudYaXTb2DhW3SlWGt+hFmcZK51sVgO07whoXwP06AjoXgNUOhsgQIAAAeoZ6NcCBAgQIECA6ueaBwTIGQQIECBAgAC55gEBcgYBAgQIECBATQ0QIECAAAFqYDdA+XaA8s2rgHwiB3SJTQC97hpbxUbfeuytBx0GJw9OHpy89zjKcZTjKMfRexzlOMpx9Oc4kiTpCZz83rGbZIuuAAAAAElFTkSuQmCC',
                }}
              />
            </View>
          </TouchableNativeFeedback>
          <Button
            color={colors.like}
            title="LEARN MORE"
            onPress={() => props.nav.navigate('SingleProject')}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={projects}
      renderItem={({item, index}) => renderRow(item, index)}
      keyExtractor={item => item._id}
      onEndReached={handleScrollEnd}
      onEndReachedThreshold={5}
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    />
  );
};

export default project;
