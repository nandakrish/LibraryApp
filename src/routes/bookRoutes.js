const express = require('express');
const booksRouter = express.Router();
const Bookdata = require('../model/Bookdata');

var books=[
    {
        title:'The God Of Small Things',
        author:'Arundhathi Roy',
        genre:'Novel',
        img:'Thegodofsmallthingsar.jpg',
        about:`The God of Small Things is the debut novel of Indian writer Arundhati Roy. It is a story about the childhood experiences of fraternal twins whose lives are destroyed by the "Love Laws" that lay down "who should be loved, and how. And how much." The book explores how the small things affect people's behavior and their lives. The book also reflects its irony against casteism, which is a major discrimination that prevails in India. It won the Booker Prize in 1997.

        The God of Small Things was Roy's first book and only novel until the 2017 publication of The Ministry of Utmost Happiness twenty years later. She began writing the manuscript for The God of Small Things in 1992 and finished four years later, in 1996. It was published the following year. The potential of the story was first recognized by Pankaj Mishra, an editor with HarperCollins, who sent it to three British publishers. Roy received £500,000 in advance and rights to the book were sold in 21 countries.`

    },

    {
        title:'Wings Of Fire',
        author:'A P J Abdul Kalam',
        genre:'Biography',
        img:'wings.jpg',
        about:`Wings of Fire: An Autobiography of A P J Abdul Kalam (1999), former President of India. It was written by Dr. Abdul Kalam and Arun Tiwari.[1]

        Dr. Kalam examines his early life, effort, hardship, fortitude, luck and chance that eventually led him to lead Indian space research, nuclear and missile programs. Kalam started his career, after graduating from Aerospace engineering at MIT (Chennai), India, at Hindustan Aeronautics Limited and was assigned to build a hovercraft prototype. Later he moved to ISRO and helped establish the Vikram Sarabhai Space Centre and pioneered the first space launch-vehicle program. During the 1990s and early 2000, Kalam moved to the DRDO to lead the Indian nuclear weapons program, with particular successes in thermonuclear weapons development culminating in the operation Smiling Buddha and an ICBM Agni (missile). Kalam died on 27 July 2015, during a speech at Indian Institute of Management in Shillong, Meghalaya.`
        
        

    },

    {
        title:'The Alchemist',
        author:'Paulo Coelho',
        genre:'Fantasy Fiction',
        img:'alchemist.jpg',
        about:`The Alchemist (Portuguese: O Alquimista) is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.[1][2] An allegorical novel, The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.`

    },


    {
        title:'Premalekhanam',
        author:'Basheer',
        genre:'Romantic Novel',
        img:'book.jpg',
        about:`Premalekhanam which means ‘love letter’, is a Malayalam novel written by Vaikom Muhammad Basheer, fondly known as Beypore Sultan. The book is a short read which is essentially an endearing love story, but it has its poignant moments too. Kesavan Nair has fallen head over heels for Saramma, his house owner’s daughter; Saramma on the other hand is in total denial and sarcastic about his attempts. 

        The book gets its title aptly so from the love letter (premalekhanam) written by Kesavan Nair to Saramma, which marks the beginning and end of the story. The story is simple with minimum canvas and characters still it just satisfies your reading pallet. Basheer has brought out the complexities and sweetness of love with such finesse.  The story progresses through the conversations of the two characters but the innate humour in Basheer’s writing makes their banter adorable. The breezy writing and the timely humour in colloquial Malayalam make it unputdownable.`

    },

    {
        title:'My Story',
        author:'Madhavikutty',
        genre:'Autobiography',
        img:'mystory.jpg',
        about:`My Story is an autobiographical book written by Indian author and poet Kamala Das (also known as Kamala Surayya or Madhavikutty). The book was originally published in Malayalam, titled Ente Katha. The book evoked violent reactions of admiration and criticism among the readers and critics. It remains to date the best-selling woman's autobiography in India.

        My Story is a chronologically ordered, linear narrative written in a realist style. In the book, Das recounts the trials of her marriage and her painful self-awakening as a woman and writer. The entire account written in the format of a novel. Though My Story was supposed to be an autobiography, Das later admitted that there was plenty of fiction in it.The book, with 50 chapters, follows Aami's ( Kamala ) life from age four through British colonial and missionary schools in Calcutta where she had to face racist discrimination; through the brutal and indulgent relationship with her husband; through her sexual awakening; her literary career; extramarital affairs; the birth of her children; and, finally, a slow but steady coming to terms with her spouse, writing, and sexuality. She mostly upholds her personal self in her autobiography rather than the political and social upheaval predominant during the war of independence in the then India.`

    },
      

    {
        title:'War And Peace',
        author:'Leo Tolstoy',
        genre:'Historical Novel',
        img:'tolstoy.jpg',
        about:`The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families. Portions of an earlier version, titled The Year 1805,[4] were serialized in The Russian Messenger from 1865 to 1867 before the novel was published in its entirety in 1869.[5]

        Tolstoy said War and Peace is "not a novel, even less is it a poem, and still less a historical chronicle." Large sections, especially the later chapters, are philosophical discussions rather than narrative.[6] Tolstoy also said that the best Russian literature does not conform to standards and hence hesitated to call War and Peace a novel. Instead, he regarded Anna Karenina as his first true novel.`

    },







]


function router(nav) {
    
    booksRouter.get('/', function (req, res) {
        Bookdata.find()
        .then(function(books){
            res.render("books",
            {
                books,
                nav
            });
        });        
    });

    booksRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('book',{
                nav,
                book
            });
        });       
    });
    return booksRouter;
}
module.exports = router;