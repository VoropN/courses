import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app/app.module';
import { environment } from './environments/environment';
import { createServer } from 'miragejs';
import db from 'db.json';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

let id = 10000;
createServer({
  routes() {
    this.get('/about', (_, req) => {
      return db.about;
    });
    
    this.get('/courses', (_, req) => {
      let courses = db.courses;
      const { _start = 0, _end = id, name_like } = req.queryParams;
      if (name_like) {
        courses = courses.filter(({ name }) => name.includes(name_like));
      }
      return courses.slice(+_start, +_end);
    });
    this.get('/courses/:id', (_, req) => {
      const courseId = +req.params.id;

      return db.courses.find(({ id }) => id === courseId);
    });
    this.put('/courses/:id', (_, req) => {
      const updatedCourse = JSON.parse(req.requestBody);
      const courseId = +req.params.id;
      const courseIdx = db.courses.findIndex(({ id }) => id === courseId);
      db.courses[courseIdx] = updatedCourse;

      return updatedCourse;
    });
    this.delete('/courses/:id', (_, req) => {
      const courseId = +req.params.id;
      const courseIdx = db.courses.findIndex(({ id }) => id === courseId);
      db.courses.splice(courseIdx, 1);

      return db.courses;
    });
    this.post('/courses', (_, req) => {
      const newCourse = JSON.parse(req.requestBody);
      newCourse["id"] = ++id;
      db.courses.unshift(newCourse);

      return db.courses;
    });
  },
});