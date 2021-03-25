import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import 'chai/register-should';
import { expect } from 'chai';

import aes from '../middleware/aesEncryption';

chai.use(chaiHttp);

describe('Testing the mission endpoints:', () => {
    let globalNewMission = {
        key: 'test', 
        value: { 'x':  {'y': 'z'}}
    };
    let globalAesNewMission = { encBody: aes.encrypt(globalNewMission)};
    let globalUpdateMission = {
      key: 'test_1',
      value: { 'a':  {'b': 'c'}}      
    }
    let globalAesUpdateMission = { encBody:aes.encrypt(globalUpdateMission)};

    it('It should create a mission', (done) => {
      chai.request(app)
        .post('/api/v1/mission')
        .set('Accept', 'application/json')
        .send(globalAesNewMission)
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          globalNewMission['id'] = data._id;
          expect(res.status).to.equal(200);
          expect(data.key).to.equal(globalNewMission.key);
          done();
        });
    });
  
    it('It should not create a mission with incorect parameters', (done) => {
      chai.request(app)
        .post('/api/v1/mission')
        .set('Accept', 'application/json')
        .send(globalNewMission)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  
    it('It should get all missions', (done) => {
      chai.request(app)
        .get('/api/v1/mission')
        .set('Accept', 'application/json')
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(200);
          data[0].should.have.property('key');
          data[0].should.have.property('value');
          done();
        });
    });
  
    it('It should get a particular mission', (done) => {
      chai.request(app)
        .get(`/api/v1/mission/${globalNewMission['id']}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(200);
          data.should.have.property('key').eql(globalNewMission.key);
          data.should.have.property('value').eql(globalNewMission.value);
          done();
        });
    });
  
    it('It should not get a particular mission with invalid id. Catch', (done) => {
      const missionId = 'njnuinunuasn';
      chai.request(app)
        .get(`/api/v1/mission/${missionId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(404);
          done();
        });
    });
  
    it('It should not get a particular mission with invalid id', (done) => {
      const missionId = '5fce40275f015a3cf0b1c7e8';
      chai.request(app)
        .get(`/api/v1/mission/${missionId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(404);
          expect(data).to.eql(`Mission with id: ${missionId} not found`);
          done();
        });
    });
  
    it('It should update a mission', (done) => {
      chai.request(app)
        .put(`/api/v1/mission/${globalNewMission['id']}`)
        .set('Accept', 'application/json')
        .send(globalAesUpdateMission)
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(200);
          done();
        });
    });
  
    it('It should get a updated mission', (done) => {
      chai.request(app)
        .get(`/api/v1/mission/${globalNewMission['id']}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(200);
          expect(data.key).equal(globalUpdateMission.key);
          done();
        });
    });
  
    it('It should not update a mission with incorrect id', (done) => {
      let incorrectId = '5fce42275a015a3cf0b1c7e8';
      chai.request(app)
        .put(`/api/v1/mission/${incorrectId}`)
        .set('Accept', 'application/json')
        .send(globalAesUpdateMission)
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(404);
          expect(data).to.eql('Mission didn\'t update');
          done();
        });
    });
  
    it('It should delete a mission', (done) => {
      chai.request(app)
        .delete(`/api/v1/mission/${globalNewMission['id']}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(200);
          done();
        });
    });  
   
    it('It should not delete a mission with incorrect id', (done) => {
      let incorrectId = '5fce42275a015a3cf0b1c7e8';
      chai.request(app)
        .delete(`/api/v1/mission/${incorrectId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const resDecr = aes.decrypt(res.text);
          const { data } = resDecr;
          expect(res.status).to.equal(404);
          expect(data).to.eql(`Mission didn't remove`);
          done();
        });
    });  
});