const data = {
	title:"ВВВ", content:"ВВВ", date:"2019-05-22", draft:true
}

const errors = require('../../helpers/errors');
const Service = require('../../services/posts');
const repository = require('../mocks/repository')(data);

const service = new Service(repository, errors);


describe('Тестовый набор для Service.posts', () => {
  beforeEach(() => repository.mockClear());


  	describe('>> тестирование модуля', () => { 
  		it('должно возвращать объект для добавления лайка', () => {
		  expect(service.upvote())
		    .toBeInstanceOf(Object);
		});	

		it('должно возвращать объект для удаления лайка', () => {
		  expect(service.downvote())
		    .toBeInstanceOf(Object);
		});

  	});

  	describe('>> постраничное чтение', () => { 
  		it('должно возвращать promise', () => {
		  expect(service.readChunk())
		    .toBeInstanceOf(Promise);
		});

		it('должно возвращать promise для всех записей', () => {
		  expect(service.readChunkUnivers())
		    .toBeInstanceOf(Promise);
		});

		it('должно возвращать массив записей', async () => {
		  let records = await service.readChunk();

		  expect(records).toEqual(data);
		});

		it('должно расcчитывать смещение', async () => {
		  await service.readChunk({ limit: 10, page: 1 });
		  await service.readChunk({ limit: 5, page: 2 });

		  expect(repository.findAll)
		    .toHaveBeenCalledTimes(2);
		});
  	});

    describe('>> чтение', () => {
	   	it('должно возвращать promise', () => {
		  expect(service.read())
		    .toBeInstanceOf(Promise);
		});

		it(`должно возвращать ошибку, если id не целое число`, async () => {
		  expect.assertions(2);

		  try {
		    await await service.read('surprise!');
		  } catch (error) {

		    expect(repository.findById)
		      .not.toHaveBeenCalled();

		    expect(error).toEqual(errors.invalidId);

		  }
		});
    })

    describe('>> создание', () => { 
    	it('должно возвращать promise', () => {
		  expect(service.create())
		    .toBeInstanceOf(Promise);
		}); 
    });

  	describe('>> обновление', () => { 
  		it('должно возвращать promise', () => {
		  expect(service.update())
		    .toBeInstanceOf(Promise);
		});
  	});

  	describe('>> удаление', () => { 
  		it('должно возвращать promise', () => {
		  expect(service.delete())
		    .toBeInstanceOf(Promise);
		});

  	});
})