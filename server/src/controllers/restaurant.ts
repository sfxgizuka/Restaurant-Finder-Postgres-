import { Request, Response } from 'express';
import db from '../database/data';

export const getRestaurants = async(req: Request, res: Response) =>{
    try{
        const results = await db.query('select * from restaurants');
        // console.log(results);
        
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
            
        })
    }catch(error){

    }
    
}

export const getRestaurant = async(req: Request, res: Response) =>{
    try {
        const result = await db.query('select * from restaurants where id = $1', [req.params.id]);
        // console.log(result);
        if(result.rows.length < 1){
            return res.status(404).json({status:'error', error:'user not found'});
        }
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: result.rows[0]
            }
            
        })
    } catch (error) {
        res.status(404).json({status:'error', error:error.message});
    }
}

export const createRestaurant = async(req: Request, res: Response) => {
    try {
        const { name, location, price_range} = req.body;
        const restaurant = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [name, location, price_range]);
        res.status(201).json({
            status: 'success',
            data: {
                restaurants: restaurant.rows[0]
            }
            
        })
    } catch (error) {
        res.status(404).json({status:'error', error:error.message});
    }
}

export const updateRestaurant = async(req: Request, res: Response) => {
    try {
        const { name, location, price_range} = req.body;
        const id = req.params.id;
        const restaurant = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [name, location, price_range, id]);
        console.log(restaurant);
        
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0]
            }
            
        })
    } catch (error) {
        res.status(404).json({status:'error', error:error.message});
    }
}

export const deleteRestaurant = async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = db.query('DELETE FROM restaurants WHERE id = $1', [id]);
        res.status(200).json({
            status: 'success',
            message: 'restaurant successfully deleted'
            
        })
    } catch (error) {
        res.status(400).json({status:'error', error:error.message});
    }
}