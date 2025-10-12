import pkg from 'sequelize';
import { Category, Prompt } from "../models/index.js";
const { fn, col } = pkg;

// GET /api/categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { isActive: true },
            attributes: {
                include: [
                    // Добавляем поле promptCount с количеством промптов
                    [fn('COUNT', col('prompts.id')), 'promptCount']
                ]
            },
            include: [{
                    model: Prompt,
                    as: 'prompts',                  // совпадение с alias в связи
                    attributes: [],                 // не подтягиваем поля, только считаем
                    where: { status: 'published' },
                    required: false                 // чтобы категории без промптов тоже попали
            }],
            group: ['Category.id'],
            order: [['name', 'ASC']]
        });

        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
