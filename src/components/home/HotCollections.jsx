import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

// collectionData[index].

const HotCollections = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchHotCollectionsData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollectionData(data);
      setLoaded(true);
      console.log(collectionData);
    }
    fetchHotCollectionsData();
  }, []);

  const owlCarouselOptions = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      867: {
        items: 3,
      },
      950: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loaded ? (
            <>
              <ReactOwlCarousel {...owlCarouselOptions} nav loop>
                {new Array(6).fill(0).map((_, index) => (
                  <div className="p-1" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          {collectionData[index] &&
                            collectionData[index].nftImage && (
                              <img
                                src={collectionData[index].nftImage}
                                className="lazy img-fluid"
                                alt=""
                              />
                            )}
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          {collectionData[index] &&
                            collectionData[index].authorImage && (
                              <img
                                className="lazy pp-coll"
                                src={collectionData[index].authorImage}
                                alt=""
                              />
                            )}
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          {collectionData[index] &&
                            collectionData[index].title && (
                              <h4>{collectionData[index].title}</h4>
                            )}
                        </Link>
                        {collectionData[index] &&
                          collectionData[index].code && (
                            <span>ERC-{collectionData[index].code}</span>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </ReactOwlCarousel>
            </>
          ) : (
            <ReactOwlCarousel {...owlCarouselOptions} nav loop>
              {new Array(6).fill(0).map((_, index) => (
                <div className="p-1" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <Skeleton
                          width="100%"
                          height="100%"
                          borderRadius="8px"
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <Skeleton
                          width="100%"
                          height="60px"
                          borderRadius="50%"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <div>
                          <Skeleton
                            width="70%"
                            height="20px"
                            borderRadius="4px"
                          />
                        </div>
                      </Link>

                      <div>
                        <Skeleton
                          width="40%"
                          height="20px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
