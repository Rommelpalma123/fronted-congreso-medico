import { Fragment, useEffect, useState } from 'react';

import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';

import { Header } from '@/components/Header';
import { CardImageHome } from '@/components/public/CardImageHome';
import { FormRegister } from '@/components/public/FormRegister';
import { Footer } from '@/components/Footer';

import { orderCoursesByType } from '@/helpers/utils';

export const HomePage = () => {
  const { showLoader, hideLoader } = useLoader();
  const server = useServer();

  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    showLoader();
    try {
      const data = await server.getCourses();
      const _courses = orderCoursesByType(data);
      setCourses(_courses);
    } catch (error) {
      console.log(error);
      setCourses([]);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Fragment>
      <Header />

      <div className='container m-auto w-100'>
        <div className='row  d-flex justify-content-center '>
          <div className='col-lg-5 col-md-8 col-sm-10 col-12 d-flex justify-content-center px-3'>
            {courses.length > 0 && (
              <div className='w-100'>
                {courses?.map((item, index) => (
                  <CardImageHome key={index} course={item ?? {}} />
                ))}
              </div>
            )}
          </div>

          <div className='col-lg-5 col-md-8 col-sm-10 col-12 d-flex justify-content-center px-4'>
            {courses.length > 0 && <FormRegister data={courses} />}
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};
