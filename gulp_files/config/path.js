// получаем папки проекта
import * as node_path from 'path';
const root_folder = node_path.basename(node_path.resolve())

// пути к папкам проекта
const prod_folder   = `./prod`; // TODO: можно использовать название текущего проекта /* root_folder */
const dev_folder    = `./dev`;
const src_folder    = `./src`;

// создаем объект path, в котором хронятся все пути
export const path = {
  // пути к файлам продакшена
  prod:{
    html:`${prod_folder}/`,
    css: `${prod_folder}/css/`,
    js: `${prod_folder}/js/`,
    img: `${prod_folder}/img/`,
    fonts: `${prod_folder}/fonts/`,
    files: `${prod_folder}/files/`,
  },      

  // пути к файлам разработки
  dev:{
    html:`${dev_folder}/`,
    css: `${dev_folder}/css/`,
    js: `${dev_folder}/js/`,
    img: `${dev_folder}/img/`,
    fonts: `${dev_folder}/fonts/`,
    files: `${dev_folder}/files/`,
  },       
  
  // пути к исходным файлам
  src:{         
    pug: `${src_folder}/pug/pages/*.pug`,
    scss: `${src_folder}/scss/style.scss`,
    js: `${src_folder}/js/app.js`,
    img: `${src_folder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${src_folder}/img/**/*.svg`,
    // svgicons: `${src_folder}/svgicons/*svg`,
    // берем отсюда все файлы и перекидываем в нужную папку
    files: `${src_folder}/files/**/*.*`,  
  },       

  // пути к файлам, за которыми будет следить Gulp
  watch:{
    pug:`${src_folder}/pug/**/*.pug`,
    scss: `${src_folder}/scss/**/*.scss`,
    js: `${src_folder}/js/**/*.js`,
    img: `${src_folder}/img/**/*.{jpg, jpeg, png, gif, webp, svg, ico}`,
    files: `${src_folder}/files/**/*.*`,
  },     
  clean_dev:    dev_folder,
  clean_prod:   prod_folder,
  prod_folder:  prod_folder,
  dev_folder:   dev_folder,
  src_folder:   src_folder,
  root_folder:  root_folder,
  ftp: ``
}