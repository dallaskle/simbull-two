import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./landingpage.css";

const Reviews = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  return (
      <>
    <div className='reviews'>
        <div className='review-title robo900'>What are people saying?</div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        className="transition"
      >
        <div className="review-card">
          <div className="review-name">Liz</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            I love being able to see my account balance grow each week!
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">@DynastyDorks</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            New to this, it is very simple and easy to use. Play a lot of fantasy sports or gambling, this is awesome. Love trying something new and this is a fun way to enjoy sports. I have already made some trades as well as some money.  
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">@MikeyJSports</div>
          <div className="review-stars">⭐⭐⭐⭐</div>
          <div className="review-details">
          I love what your doing with it. I would like to see you do this for MLB, NBA also. Every transaction went smooth. Very easy to understand and use.
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">Dalton</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            Simbull is amazing, they stand to revolutionize sports betting!!
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">Justin</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            NBA, MLB, NHL, Give the gift of Simbull.
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">Jeanne</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            This is a fun way to invest in my favorite sports teams and also be
            engaged in the other teams. 
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">Ben</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            The website is super easy to use and it's a great new take on sports
            betting.
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">Josh</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            Fun new spin on sports betting! Can't wait to keep buying shares of
            my favorite teams!
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">James</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            Very innovative and fun approach to football. Easy and simple. Great returns.
          </div>
        </div>
        <div className="review-card">
          <div className="review-name">Chris</div>
          <div className="review-stars">⭐⭐⭐⭐⭐</div>
          <div className="review-details">
            Simbull is a fun way to invest in your favorite teams long term, without much risk of losing in the long run.
          </div>
        </div>
      </Carousel>
      
    </div>
    <div id='gold-triangle2'></div>
    </>
  );
};

export default Reviews;