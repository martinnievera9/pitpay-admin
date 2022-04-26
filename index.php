<?php
/**
 * The main template file
 *
 * @package PitPay
 */

get_header(); ?>
	<main id="primary" class="site__main site-main">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<div id="index">
					<?php the_content(); ?>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>
	</main>
<?php
get_footer();
